'use client';

import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { rentVinyl, returnVinyl } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

export default function Form() {
  const [rentOrReturn, setRentOrReturn] = useState('');
  const [query, setQuery] = useState('');

  const router = useRouter();

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRentOrReturn(event.target.value);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let confirmation = false;
    try {
      const email = 'ted_lasso@afcrichmond.com';
      switch (rentOrReturn) {
        case 'rent':
          var response = await rentVinyl(query, email);
          confirmation = window.confirm(
            `${response?.message}. Your balance is now ${response?.userBalance.toFixed(
              2,
            )}`,
          );
          break;
        case 'return':
          var response = await returnVinyl(query, email);
          confirmation = window.confirm(`${response?.message}.`);
      }
      if (confirmation) {
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Choose a Vinyl
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="string"
                step="0.01"
                placeholder="Enter vinyl title"
                value={query}
                onChange={handleQueryChange}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PlayCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Rent or Return */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Are you Renting or Returning?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="rent"
                  name="status"
                  type="radio"
                  value="rent"
                  checked={rentOrReturn === 'rent'}
                  onChange={handleStatusChange}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="rent"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Rent <ArrowUpTrayIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="return"
                  name="status"
                  type="radio"
                  value="return"
                  checked={rentOrReturn === 'return'}
                  onChange={handleStatusChange}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="return"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Return <ArrowDownTrayIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
