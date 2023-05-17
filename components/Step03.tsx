import { useState, useEffect } from 'react';
import { useFormData } from '../context';

export default function Step3() {
  const { data }: any = useFormData();
  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  useEffect(() => {
    setName(data.name);
    setFamily(data.family);
  }, [data.family, data.name]);
  console.log(name);
  return (
    <div className="text-center font-lg">
      Congrats {data.name}
      {data.family}
    </div>
  );
}
