import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Helper to check ObjectId validity
function isValidObjectId(id) {
    return ObjectId.isValid(id);
}

// GET single team member
export async function GET(req, { params }) {
    const { id } = params; // Get id from URL parameters
    if (!isValidObjectId(id)) {
        return new Response(JSON.stringify({ success: false, error: "Invalid ID format" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("volunteers");
    const _id = new ObjectId(id);

    try {
        const member = await collection.findOne({ _id });
        if (!member) {
            return new Response(JSON.stringify({ success: false, error: "Member not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, data: member }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

// PUT update team member
export async function PUT(req, { params }) {
    const { id } = params; // Get id from URL parameters
    if (!isValidObjectId(id)) {
        return new Response(JSON.stringify({ success: false, error: "Invalid ID format" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("volunteers");
    const _id = new ObjectId(id);

    try {
        const updateData = await req.json(); // Parse request body to JSON

        // Remove _id from update data if it exists
        if (updateData._id) delete updateData._id;

        const result = await collection.updateOne(
            { _id },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ success: false, error: "Member not found" }), { status: 404 });
        }

        const updatedMember = await collection.findOne({ _id });
        return new Response(
            JSON.stringify({ success: true, data: updatedMember }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

// DELETE team member
export async function DELETE(req, { params }) {
    const { id } = params; // Get id from URL parameters
    if (!isValidObjectId(id)) {
        return new Response(JSON.stringify({ success: false, error: "Invalid ID format" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("volunteers");
    const _id = new ObjectId(id);

    try {
        const result = await collection.deleteOne({ _id });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ success: false, error: "Member not found" }), { status: 404 });
        }

        return new Response(
            JSON.stringify({ success: true, message: "Member deleted successfully" }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
