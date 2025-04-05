import { Svix, Webhook } from "svix";
import User from "../models/UserModel.js";
// import Purchase from '../models/PurchaseModel.js'
import Stripe from "stripe";

// API Controller Function to manage Clerk User with Database

export const clerkWebHooks = async (req, res) => {
  try {
    console.log("Received Webhook Data:", req.body);

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    // Log type to ensure the webhook type is what we expect
    console.log("Webhook Type:", type);

    switch (type) {
      // create user
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };

        // Log user data for debugging
        console.log("Creating User:", userData);

        await User.create(userData);
        res.json({});
        break;
      }

      // update user data
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        // Log the update data
        console.log("Updating User:", userData);

        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      // Delete User
      case "user.deleted": {
        // Log deletion data
        console.log("Deleting User ID:", data.id);

        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        console.log("Unhandled event type:", type);
        res
          .status(400)
          .json({ success: false, message: "Unhandled event type" });

        break;
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.json({ success: false, message: error.message });
  }
};

// WebHook
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = Stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_KEY
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { purchaseId } = session.data[0].metadata;

      const purchaseData = await Purchase.findById(purchaseId);
      const userData = await User.findById(purchaseData.userId);
      const courseData = await Course.findById(
        purchaseData.courseId.toString()
      );

      courseData.enrolledStudents.push(userData);
      await courseData.save();

      userData.enrolledCourses.push(courseData._id);
      await userData.save();

      purchaseData.status = "completed";
      await purchaseData.save();

      break;
    }
    case "payment_intent.payment_failed":{
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { purchaseId } = session.data[0].metadata;
      const purchaseData = await Purchase.findById(purchaseId);

      purchaseData.status = "failed";
      await purchaseData.save();


      break;

    }
  
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
};
