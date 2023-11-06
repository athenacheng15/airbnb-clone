'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { Container, CategoryBox } from '@Components';

import { categories } from './constant';

export default () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="flex fllex-row items-center justify-between pt-4 overflow-x-auto">
                {categories.map(item => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
};
