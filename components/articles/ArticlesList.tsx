import ArticleCard from "@/components/articles/cards/ArticleCard";
import { useFilters } from "@/hooks/explore/useFilters";
import { useSearch } from "@/hooks/models/useSearch";
import { useDictionary } from "@/hooks/useDictionary";
import { addQuery } from "@/store/features/history/historySlice";
import DefaultButton from "@/ui/buttons/DefaultButton";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Filters from "../filters/Filters";
import { Spinner } from "@heroui/react";
import { UserModel } from "@/models/user";

export type ArticlesListProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
}

const ArticlesList: React.FC<ArticlesListProps> = ({
    user,
    children
}) => {
    const { articles, query, setQuery, pages, setPages, totalElements, totalPages, likeMutate, isFetching } = useSearch();
    const searchParams = useSearchParams();

    const { filters, setFilter } = useFilters();

    const { language, translate } = useDictionary(user);
    const dispath = useDispatch();

    useEffect(() => {
        const query = searchParams.get('query');
        setQuery(query || '');
        
        if (query) {
            dispath(addQuery({query}));
        }
    }, [searchParams]);

    return (
        <div className={clsx(
            'flex flex-col w-full pr-32 pl-32 items-center gap-12'
        )}>
            <div className={clsx(
                'flex flex-col w-full items-center gap-3'
            )}>
                <div className={clsx(
                    'flex flex-row w-full justify-between'
                )}>
                    <div className={clsx(
                        'flex flex-col gap-2'
                    )}>
                        <p color="primary" className={clsx(
                            'font-interTight font-semibold text-aspectText'
                        )}>{query ? 
                                translate('explore.articles_found_with_query_text').replace('%count%', totalElements.toString()).replace('%query%', query) 
                            : 
                                translate('explore.articles_found_default_text').replace('%count%', totalElements.toString())
                            }
                        </p>
                    </div>
                    <Filters user={user} />
                </div>
                <div className={clsx(
                    'grid grid-cols-3 gap-8 items-start w-full'
                )}>
                    {
                        articles.map((article, index) =>
                            <ArticleCard
                                key={index}
                                likeMutate={likeMutate}
                                article={article}
                                query={query}
                                extended={true}
                            />
                        )
                    }
                </div>
            </div>
            {isFetching && <Spinner color="secondary" />}
            <div className={clsx(
                'flex flex-col items-center gap-2'
            )}>
                <p className="font-interTight font-semibold text-sm text-secondaryText">
                    {translate('explore.articles_showed_count_text').replace('%count%', articles.length.toString()).replace('%total%', totalElements.toString())}
                </p>
                <DefaultButton
                    text={translate('explore.articles_see_more_button')}
                    customClassName='font-interTight font-semibold rounded-lg text-sm'
                    size="sm"
                    type='submit'
                    onClickButton={() => setPages((prev) => prev + 1)}
                    isDisabled={articles.length >= totalElements}
                />
            </div>
        </div>
    );
}

export default ArticlesList;