<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        //Log::info('init upload: ');
        $uploaded = [];
        try {
            $folder = $request->input('folder');

            // Validate the images
            $request->validate([
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            //Log::info('images type check: ');

            // Create the directory if it doesn't exist
            $directoryPath = public_path('storage/picture/' . $folder);
            if (!File::exists($directoryPath)) {
                File::makeDirectory($directoryPath, 0777, true);
            }

            // Iterate over each uploaded image
            foreach ($request->file('images') as $image) {
                if (!$image->isValid()) {
                    Log::error('File upload error: ' . $image->getError());
                    continue;
                }

                // Get original file name
                $originalName = $image->getClientOriginalName();
                // Define the target path
                $targetPath = $directoryPath . DIRECTORY_SEPARATOR . $originalName;

                // Move the file to the target directory
                $image->move($directoryPath, $originalName);

                // Add the uploaded image URL
                $uploaded[] = asset('storage/picture/' . $folder . '/' . $originalName);
                //Log::info('uploaded: ' . print_r($uploaded, true));
            }
        } catch (\Throwable $e) {
            Log::error('Error during upload: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Images uploaded successfully.',
            'images' => $uploaded,
        ]);
    }

    public function list(Request $request)
    {
        // Get the license from the request query
        $folder = $request->query('folder');

        // Define the directory where images are stored in public
        $directoryPath = public_path('storage/picture/' . $folder);

        // Check if the directory exists
        if (!File::exists($directoryPath)) {
            // Log::error('Directory does not exist: ' . $directoryPath);
            // return response()->json(['error' => 'Directory not found'], 404);
             File::makeDirectory($directoryPath, 0777, true, true);
        }

        // Get all files in the directory
        $files = File::allFiles($directoryPath);

        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];

        // Filter out non-image files
        $filtered = array_filter($files, function ($file) use ($allowedExtensions) {
            // Get the file's extension (lowercase)
            $extension = strtolower($file->getExtension());

            // Check if the extension is in the allowed list
            return in_array($extension, $allowedExtensions);
        });

        // Map the file paths to URLs
        $urls = array_map(function ($file) use ($folder) {
            return asset('storage/picture/' . $folder . '/' . $file->getFilename());
        }, $filtered);

        return response()->json($urls);
    }
    public function delete(Request $request)
    {
        $folder = $request->input('folder');
        $filename = $request->input('filename');

        // Define the file path
        $filePath = public_path('storage/picture/' . $folder . '/' . $filename);

        // Check if the file exists
        if (File::exists($filePath)) {
            // Delete the file
            File::delete($filePath);
            return response()->json(['message' => 'File deleted successfully.']);
        } else {
            return response()->json(['error' => 'File not found.'], 404);
        }
    }
}
