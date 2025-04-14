import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Helper to check ObjectId validity
function isValidObjectId(id) {
    return ObjectId.isValid(id);
}

// GET single event
export async function GET(req, { params }) {
    const { id } = params;
    if (!isValidObjectId(id)) {
        return new Response(JSON.stringify({ success: false, error: "Invalid ID format" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("events");
    const _id = new ObjectId(id);

    try {
        const event = await collection.findOne({ _id });
        if (!event) {
            return new Response(JSON.stringify({ success: false, error: "Event not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, data: event }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

// PUT update event
export async function PUT(req, { params }) {
    const { id } = params;
    if (!isValidObjectId(id)) {
        return new Response(JSON.stringify({ success: false, error: "Invalid ID format" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("events");
    const _id = new ObjectId(id);

    try {
        const updateData = await req.json();

        // Prevent accidental _id overwrite
        if (updateData._id) delete updateData._id;

        const result = await collection.updateOne(
            { _id },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ success: false, error: "Event not found" }), { status: 404 });
        }

        const updatedEvent = await collection.findOne({ _id });
        return new Response(
            JSON.stringify({ success: true, data: updatedEvent }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

// DELETE event
export async function DELETE(req, { params }) {
    const { id } = params;
    if (!isValidObjectId(id)) {
        return new Response(JSON.stringify({ success: false, error: "Invalid ID format" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("codeNexusDB");
    const collection = db.collection("events");
    const _id = new ObjectId(id);

    try {
        const result = await collection.deleteOne({ _id });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ success: false, error: "Event not found" }), { status: 404 });
        }

        return new Response(
            JSON.stringify({ success: true, message: "Event deleted successfully" }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
