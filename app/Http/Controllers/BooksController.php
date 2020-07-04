<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class BooksController extends Controller
{
    public function index(Request $request): array
    {
        return Book::all()->toArray();
    }

    public function store(Request $request)
    {
        $request_post = $request->post();

        if ( ! isset($request_post['title'])) {
            return new Response('Title is required', 400);
        }

        $data = [
            'title' => $request_post['title'],
            'author' => $request_post['author'] ?? '',
            'description' => $request_post['description'] ?? ''
        ];

        $book = Book::create($data);
        if ( ! $book->save()) {
            return new Response('',500);
        }

        return new Response(Book::find($book->id)->toArray(), 201);
    }

    public function show(Request $request)
    {
        $path = $request->path();
        $id = substr($path, strripos($path, '/') + 1);

        if ( ! $book = Book::find($id)) {
            return new Response('',404);
        }

        return $book->toArray();
    }

    public function update(Request $request)
    {
        $request_post = $request->post();
        $path = $request->path();
        $id = substr($path, strripos($path, '/') + 1);

        if ( ! $book = Book::find($id)) {
            return new Response('',404);
        }

        if ( ! isset($request_post['title'])) {
            return new Response('Title is required', 400);
        }

        $attributes = [
            'title',
            'author',
            'description'
        ];

        foreach (array_keys($request_post) as $key) {
            if (in_array($key, $attributes)) {
                $book->{$key} = $request_post[$key];
            }
        }

        if ( ! $book->save()) {
            return new Response('',500);
        }

        return new Response($book->toArray(), 201);
    }

    public function destroy(Request $request)
    {
        $path = $request->path();
        $id = substr($path, strripos($path, '/') + 1);

        if ( ! $book = Book::find($id)) {
            return new Response('',404);
        }

        return new Response('', $book->delete() ? 204 : 500);
    }
}
