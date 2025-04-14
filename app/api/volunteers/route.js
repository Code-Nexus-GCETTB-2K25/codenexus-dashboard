import clientPromise from '../../../lib/mongodb';

// GET all team members
export async function GET(req) {
    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("volunteers");

    try {
        const members = await collection.find({}).sort({ order: 1 }).toArray();
        return new Response(JSON.stringify({ success: true, data: members }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

// POST new team member
export async function POST(req) {
    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("volunteers");

    try {
        const memberData = await req.json(); // Convert request body to JSON

        // Add basic validation
        if (!memberData.name || !memberData.role) {
            return new Response(JSON.stringify({ success: false, error: "Name and role are required" }), { status: 400 });
        }

        // Get the next order number
        const highestOrder = await collection.find().sort({ order: -1 }).limit(1).toArray();
        const nextOrder = highestOrder.length > 0 ? highestOrder[0].order + 1 : 1;

        const newMember = {
            ...memberData,
            order: nextOrder,
        };

        const result = await collection.insertOne(newMember);
        return new Response(
            JSON.stringify({ success: true, data: { _id: result.insertedId, ...newMember } }),
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
