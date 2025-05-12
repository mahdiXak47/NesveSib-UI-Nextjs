import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadDir = '/hello';
    
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      return res.status(500).json({ message: 'Upload directory does not exist' });
    }

    const fileExtension = path.extname(file.originalFilename || '');
    const newFileName = `${Date.now()}${fileExtension}`;
    const newPath = path.join(uploadDir, newFileName);

    // Copy the file to the destination
    await fs.promises.copyFile(file.filepath, newPath);
    
    // Clean up the temporary file
    await fs.promises.unlink(file.filepath);

    return res.status(200).json({ 
      message: 'File uploaded successfully',
      fileName: newFileName
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Error uploading file' });
  }
} 