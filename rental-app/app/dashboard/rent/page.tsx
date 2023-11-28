import { Metadata } from 'next';
import Form from '@/app/ui/rent/rent-form';
import Breadcrumbs from '@/app/ui/rent/breadcrumbs';

export const metadata: Metadata = {
  title: 'Rent a Vinyl',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Rent a Vinyl',
            href: '/dashboard/rent',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}