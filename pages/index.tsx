import { useState } from 'react';
import Head from 'next/head';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import AuthModal from '../components/AuthModal';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setUploadStatus('File uploaded successfully!');
      } else {
        setUploadStatus(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      setUploadStatus('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Welcome to Our Platform</title>
        <meta name="description" content="A modern landing page built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-indigo-600">Logo</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-600 hover:text-indigo-600">Home</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Features</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600">About</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Contact</a>
                <button 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  onClick={openAuthModal}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Welcome to the Future of</span>
              <span className="block text-indigo-600">Digital Innovation</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Build amazing digital experiences with our cutting-edge platform. Start your journey today and transform your ideas into reality.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={openAuthModal}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to succeed
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our platform provides all the tools and features you need to build, launch, and grow your digital presence.
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {/* Feature 1 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <ArrowRightIcon className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy to Use</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    Intuitive interface designed for both beginners and experts.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <ArrowRightIcon className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Powerful Features</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    Advanced tools and capabilities to help you achieve your goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">File Upload</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Upload Your Files
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Securely upload and store your files with our platform.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center">
              <div className="w-full max-w-md">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-500 px-6 py-8 flex flex-col items-center justify-center"
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    {uploading ? 'Uploading...' : 'Click to upload a file'}
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>
                {uploadStatus && (
                  <p className={`mt-2 text-sm text-center ${
                    uploadStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {uploadStatus}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to dive in?</span>
              <span className="block text-indigo-200">Start your journey today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <button
                  onClick={openAuthModal}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
    </>
  );
} 