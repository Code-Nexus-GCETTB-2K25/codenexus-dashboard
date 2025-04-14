import clientPromise from '../../../lib/mongodb';

// GET all resources
export async function GET(req) {
    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("resources");

    try {
        const resources = await collection.find({}).sort({ order: 1 }).toArray();
        return new Response(JSON.stringify({ success: true, data: resources }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

// POST new team member
export async function POST(req) {
    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("resources");

    try {
        const resourcesData = await req.json(); // Convert request body to JSON

        // Add basic validation
        if (!resourcesData) {
            return new Response(JSON.stringify({ success: false, error: "All data are required" }), { status: 400 });
        }

        // Get the next order number
        const highestOrder = await collection.find().sort({ order: -1 }).limit(1).toArray();
        const nextOrder = highestOrder.length > 0 ? highestOrder[0].order + 1 : 1;

        const newResource = {
            ...resourcesData,
            order: nextOrder,
        };

        const result = await collection.insertOne(newResource);
        return new Response(
            JSON.stringify({ success: true, data: { _id: result.insertedId, ...newResource } }),
            { status: 201 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

// For unsupported methods
export async function OPTIONS(req) {
    return new Response(null, { status: 405, statusText: 'Method Not Allowed' });
}
