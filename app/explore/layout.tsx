'use client';

import { FiltersProvider } from "@/hooks/explore/useFilters";
import { SearchProvider } from "@/hooks/models/useSearch";

const ExploreLayout = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    return (
        <FiltersProvider>
            <SearchProvider>
                {children}
            </SearchProvider>
        </FiltersProvider>
    );
  }
  
  export default ExploreLayout;