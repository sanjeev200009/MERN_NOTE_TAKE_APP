import type { Context, Config } from "@netlify/functions";
import { connectDB, Note } from "./utils/db.mts";
import { applyRateLimit } from "./utils/ratelimit.mts";

export default async (req: Request, context: Context) => {
    // Apply rate limiting
    const rateLimitResult = await applyRateLimit();
    if (!rateLimitResult.isAllowed) {
        return rateLimitResult.response;
    }

    const headers = {
        'Content-Type': 'application/json',
        ...rateLimitResult.headers
    };

    try {
        // Connect to database
        await connectDB();

        const method = req.method;
        const url = new URL(req.url);
        const pathSegments = url.pathname.split('/').filter(Boolean);
        
        // Extract ID from path (e.g., /api/notes/123 -> 123)
        const noteId = pathSegments[pathSegments.length - 1] !== 'notes' ? pathSegments[pathSegments.length - 1] : null;

        switch (method) {
            case 'GET':
                if (noteId) {
                    // Get specific note by ID
                    try {
                        const note = await Note.findById(noteId);
                        if (!note) {
                            return new Response(JSON.stringify({
                                success: false,
                                message: "Note Not Found"
                            }), {
                                status: 404,
                                headers
                            });
                        }
                        
                        return new Response(JSON.stringify({
                            success: true,
                            message: "Retrieved specific note successfully",
                            data: note
                        }), {
                            status: 200,
                            headers
                        });
                    } catch (error) {
                        console.error("Error while getting specific note:", error);
                        return new Response(JSON.stringify({
                            success: false,
                            message: "Internal Server Error"
                        }), {
                            status: 500,
                            headers
                        });
                    }
                } else {
                    // Get all notes
                    try {
                        const notes = await Note.find().sort({ createdAt: -1 });
                        return new Response(JSON.stringify({
                            success: true,
                            message: "Retrieved all notes successfully",
                            data: notes,
                            count: notes.length
                        }), {
                            status: 200,
                            headers
                        });
                    } catch (error) {
                        console.error("Error while getting all notes:", error);
                        return new Response(JSON.stringify({
                            success: false,
                            message: "Internal Server Error"
                        }), {
                            status: 500,
                            headers
                        });
                    }
                }

            case 'POST':
                try {
                    const body = await req.json();
                    const { title, content } = body;
                    
                    const note = new Note({ title, content });
                    const savedNote = await note.save();

                    return new Response(JSON.stringify({
                        success: true,
                        message: `Note '${savedNote.title}' added successfully`,
                        data: savedNote
                    }), {
                        status: 201,
                        headers
                    });
                } catch (error) {
                    console.error("Error while creating note:", error);
                    return new Response(JSON.stringify({
                        success: false,
                        message: "Internal Server Error"
                    }), {
                        status: 500,
                        headers
                    });
                }

            case 'PUT':
                if (!noteId) {
                    return new Response(JSON.stringify({
                        success: false,
                        message: "Note ID is required"
                    }), {
                        status: 400,
                        headers
                    });
                }

                try {
                    const body = await req.json();
                    const { title, content } = body;
                    
                    const updatedNote = await Note.findByIdAndUpdate(
                        noteId,
                        { title, content },
                        { new: true, runValidators: true }
                    );

                    if (!updatedNote) {
                        return new Response(JSON.stringify({
                            success: false,
                            message: "Note not found"
                        }), {
                            status: 404,
                            headers
                        });
                    }

                    return new Response(JSON.stringify({
                        success: true,
                        message: "Note updated successfully",
                        data: updatedNote
                    }), {
                        status: 200,
                        headers
                    });
                } catch (error) {
                    console.error("Error while updating note:", error);
                    return new Response(JSON.stringify({
                        success: false,
                        message: "Internal Server Error"
                    }), {
                        status: 500,
                        headers
                    });
                }

            case 'DELETE':
                if (!noteId) {
                    return new Response(JSON.stringify({
                        success: false,
                        message: "Note ID is required"
                    }), {
                        status: 400,
                        headers
                    });
                }

                try {
                    const deletedNote = await Note.findByIdAndDelete(noteId);

                    if (!deletedNote) {
                        return new Response(JSON.stringify({
                            success: false,
                            message: "Note not found"
                        }), {
                            status: 404,
                            headers
                        });
                    }

                    return new Response(JSON.stringify({
                        success: true,
                        message: "Note deleted successfully"
                    }), {
                        status: 200,
                        headers
                    });
                } catch (error) {
                    console.error("Error while deleting note:", error);
                    return new Response(JSON.stringify({
                        success: false,
                        message: "Internal Server Error"
                    }), {
                        status: 500,
                        headers
                    });
                }

            default:
                return new Response(JSON.stringify({
                    success: false,
                    message: "Method not allowed"
                }), {
                    status: 405,
                    headers
                });
        }
    } catch (error) {
        console.error("Function error:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Internal Server Error"
        }), {
            status: 500,
            headers
        });
    }
};

export const config: Config = {
    path: ["/api/notes", "/api/notes/*"]
};