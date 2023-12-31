'use client';

import { formatCurrency } from '@/app/lib/utils';
import { Vinyl } from '../../lib/definitions';
import React, { useState, useEffect } from 'react';

interface VinylTableProps {
  vinyls: Vinyl[];
}

const VinylTable: React.FC<VinylTableProps> = ({ vinyls }) => {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {vinyls?.map((vinyl: any) => (
              <div
                key={vinyl.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{vinyl.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{vinyl.artist}</p>
                  </div>
                  <p className="text-sm text-gray-500">{vinyl.genre}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(parseFloat(vinyl.price))}
                    </p>
                    <p>{vinyl.stock}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Artist
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Genre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Stock
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {vinyls?.map((vinyl: any) => (
                <tr
                  key={vinyl.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{vinyl.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {vinyl.artist}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{vinyl.genre}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(parseFloat(vinyl.price))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{vinyl.stock}</td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default VinylTable;
