import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Helper to check ObjectId validity
function isValidObjectId(id) {
    return ObjectId.isValid(id);
}

// GET single resource
export async function GET(req, { params }) {
    const { id } = params; // Get id from URL parameters
    if (!isValidObjectId(id)) {
        return new Response(JSON.stringify({ success: false, error: "Invalid ID format" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("resources");
    const _id = new ObjectId(id);

    try {
        const resource = await collection.findOne({ _id });
        if (!resource) {
            return new Response(JSON.stringify({ success: false, error: "Resource not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, data: resource }), { status: 200 });
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
    const collection = db.collection("resources");
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
            return new Response(JSON.stringify({ success: false, error: "resource not found" }), { status: 404 });
        }

        const updatedResource = await collection.findOne({ _id });
        return new Response(
            JSON.stringify({ success: true, data: updatedResource }),
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
    const collection = db.collection("resources");
    const _id = new ObjectId(id);

    try {
        const result = await collection.deleteOne({ _id });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ success: false, error: "Resource not found" }), { status: 404 });
        }

        return new Response(
            JSON.stringify({ success: true, message: "Resource deleted successfully" }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
