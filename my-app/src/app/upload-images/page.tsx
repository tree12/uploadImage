'use client';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; // for App Router

const ImageUploader = dynamic(() => import('../components/ImageUploader'), { ssr: false });

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folder = 'sub-folder'; //searchParams.get('folder') ?? '';
  const redirectToCarList = () => {
    router.push('/backoffice/cars-list');
  }
  return (
    <div style={{ maxWidth: '1000px', margin: 'auto', padding: '5px' }}>
      <h1>&gt; Upload picture to folder: {folder}</h1>
      <ImageUploader folder={folder} />
    </div>
  );
}
