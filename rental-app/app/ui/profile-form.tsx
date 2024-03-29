'use client';

import {
  AtSymbolIcon,
  CakeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState, useEffect } from 'react';
import { getUser, updateUser } from '../lib/actions';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      // Check if user is authenticated and get their email from the session
      const { data: session, status } = useSession();

      if (status === 'authenticated' && session?.user) {
        const email = session.user.email;
        console.log('Email:', email);
        if (!email) {
          console.error('No email found in the session');
          return;
        }
        const user = await getUser(email);

        if (user) {
          setFormData({
            name: user.name || '',
            email: user.email || '',
            age: user.age?.toString() || '',
            gender: user.gender || '',
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // I have to get the info updated
      if (formData) {
        // Call the topUp function with the email and topupAmount
        const response = await updateUser(formData);

        // Handle the response as needed
        console.log('Top Up Response:', response);
        const confirmation = window.confirm(`Your info has been updated`);
        // Redirect back to the dashboard if the user confirms
        if (confirmation) {
          router.push('/dashboard');
        } else {
          console.log('User canceled the update.');
          const response = await updateUser(
            await getUser('roy_kent@richmondfc.com'),
          );
        }
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Client Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative">
            <input
              id="user"
              name="user"
              type="string"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Client Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email{' '}
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="string"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Client Age */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Age{' '}
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CakeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Client Gender */}
        <div className="mb-4">
          <label htmlFor="gender" className="mb-2 block text-sm font-medium">
            Gender
          </label>
          <div className="relative">
            <select
              id="gender"
              name="gender"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select a gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Profile</Button>
      </div>
    </form>
  );
}
