// app/(private routes)/profile/page.tsx

import { getServerMe } from '@/lib/api/serverApi/userApi';
import Link from 'next/link';

export default async function Profile() {
  const user = await getServerMe();

  return (
    <section>
      <div>
        <h1>My Profile</h1>
        <Link href="/profile/edit">Edit profile</Link>
      </div>
      <div>
        <h2>Name: {user.username}</h2>
        <h2>Email: {user.email}</h2>
        {/* <p>
          Some description: Lorem ipsum dolor sit amet consectetur adipisicing
          elit...
        </p> */}
      </div>
    </section>
  );
}
