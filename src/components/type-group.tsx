'use client';

import { Result } from '@/interface';
import { TypeButton } from './type-button';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TYPE_SEPARATOR } from '@/config';

interface TypeGroupProps {
  typeList: Promise<Result>;
  defaultActive?: string[];
}

export const TypeGroup = ({ typeList, defaultActive = [] }: TypeGroupProps) => {
  const { results } = use(typeList);
  const [activeType, setActiveType] = useState<string[]>(defaultActive);
  const router = useRouter();

  useEffect(() => {
    // 如果activeType为空，则不进行跳转
    if (activeType.length === 0) return;
    const searchParams = new URLSearchParams(window.location.search);
    // 设置type
    searchParams.set('type', activeType.join(TYPE_SEPARATOR));
    // 重置page
    searchParams.set('page', '1');

    router.push(`?${searchParams.toString()}`);
  }, [activeType]);

  return (
    <div className="flex items-center flex-wrap gap-2">
      <span>Types:</span>
      {results?.map((type) => (
        <TypeButton
          key={type.name}
          active={activeType.includes(type.name)}
          type={type.name}
          onChange={(active) => {
            setActiveType(
              active
                ? [...activeType, type.name]
                : activeType.filter((t) => t !== type.name)
            );
          }}
        />
      ))}
    </div>
  );
};
