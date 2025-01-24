const { getAuthToken, createOrder, getPaymentKey } = require('../services/paymobService');
const Payment = require('../models/Payment');

async function initiatePayment(req, res) {
    const { amountInEGP, billingData } = req.body; 
    try {
        const amountCents = amountInEGP * 100;

        const authToken = await getAuthToken();
        const orderId = await createOrder(authToken, amountCents);

        const completeBillingData = {
            first_name: billingData.first_name,
            last_name: billingData.last_name,
            email: billingData.email,
            phone_number: billingData.phone_number,
            street: billingData.street || "N/A",
            building: billingData.building || "N/A",
            floor: billingData.floor || "N/A",
            apartment: billingData.apartment || "N/A",
            city: billingData.city || "N/A",
            country: billingData.country || "EG"
        };

        const paymentKey = await getPaymentKey(authToken, orderId, amountCents, completeBillingData);

        const payment = new Payment({
            amountCents, 
            billingData: completeBillingData,
            paymentKey,
            status: 'pending'
        });
        await payment.save();

        res.json({
            success: true,
            paymentKey: paymentKey,
            paymentUrl: `https://accept.paymobsolutions.com/api/acceptance/iframes/4916324?payment_token=${paymentKey}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = { initiatePayment };