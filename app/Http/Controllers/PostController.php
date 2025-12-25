<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
 $request->validate([
        'page' => 'sometimes|integer|min:0',
        'size' => 'sometimes|integer|min:1',
    ]);

    $page = (int) $request->get('page', 0);
    $size = (int) $request->get('size', 10);
 



        $post = Post::with(['user', 'attachments'])
            ->skip($page * $size)->take($size)->latest()
            ->get();


        return response()->json([
            "page" => $page,
            "size" => $size,
            "posts" => $post
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data =   $request->validate([
            "caption" => "required",
            "attachments"  => "required|array",
            'attachments.*' => "file|mimes:jpg,jpeg,png,mp4"
        ]);


        // if ($request->hasFile('attachments')) {
        //     $path = $request->file('posts')->store('posts', 'public');
        //     $data['alat_gambar'] = $path;
        // }


        $post = Post::create([
            "caption" => $request->caption,
            "user_id" => Auth::user()->id,
        ]);


        foreach ($request->file('attachments') as $item) {
            $path = $item->store('posts', 'public');

            PostAttachment::create([
                "post_id" => $post->id,
                "storage_path" => $path
            ]);
        }


        return response()->json($post->load('attachments'));
    }



    /**
     * Display the specified resource.
     */
    public function show(Post $post) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user()->id;
        $post =   Post::find($id);



        if (!$post) {
            return response()->json(["message" => "Post not found"], 404);
        }



        if ($post->user_id === $user) {
            $post->delete();
            return response()->json([
                "message" => "post di delete"
            ], 204);
        } else {
            return response()->json(["message" => "Forbidden access"], 403);
        }
    }
}
