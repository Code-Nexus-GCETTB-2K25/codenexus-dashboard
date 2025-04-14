import clientPromise from '../../../lib/mongodb';

// GET all events
export async function GET(req) {
    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("events");

    try {
        const events = await collection.find({}).sort({ order: 1 }).toArray();
        return new Response(JSON.stringify({ success: true, data: events }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

// POST new event
export async function POST(req) {
    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("events");

    try {
        const eventData = await req.json();

        // Basic validation
        if (!eventData || !eventData.name || !eventData.date || !eventData.shortInfo || !eventData.fullDetails || !eventData.location) {
            return new Response(
                JSON.stringify({ success: false, error: "Title, date, shortInfo, fullDetails and location are required." }),
                { status: 400 }
            );
        }

        // Get the next order number
        const highestOrder = await collection.find().sort({ order: -1 }).limit(1).toArray();
        const nextOrder = highestOrder.length > 0 ? highestOrder[0].order + 1 : 1;

        const newEvent = {
            ...eventData,
            order: nextOrder,
        };

        const result = await collection.insertOne(newEvent);
        return new Response(
            JSON.stringify({ success: true, data: { _id: result.insertedId, ...newEvent } }),
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
