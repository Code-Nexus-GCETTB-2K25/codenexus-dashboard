import clientPromise from '../../../lib/mongodb';

// GET all activities
export async function GET(req) {
    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("activities");

    try {
        const activities = await collection.find({}).sort({ order: 1 }).toArray();
        return new Response(JSON.stringify({ success: true, data: activities }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

// POST new activity
export async function POST(req) {
    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("activities");

    try {
        const activityData = await req.json();

        // Basic validation
        if (!activityData || !activityData.title || !activityData.summary || !activityData.date) {
            return new Response(
                JSON.stringify({ success: false, error: "Title, date, summary are required." }),
                { status: 400 }
            );
        }

        // Get the next order number
        const highestOrder = await collection.find().sort({ order: -1 }).limit(1).toArray();
        const nextOrder = highestOrder.length > 0 ? highestOrder[0].order + 1 : 1;

        const newActivity = {
            ...activityData,
            order: nextOrder,
        };

        const result = await collection.insertOne(newActivity);
        return new Response(
            JSON.stringify({ success: true, data: { _id: result.insertedId, ...newActivity } }),
            { status: 201 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

// For unsupported HTTP methods
export async function OPTIONS(req) {
    return new Response(null, { status: 405, statusText: 'Method Not Allowed' });
}
