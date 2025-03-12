import {Button, Input, Select} from "@mantine/core";
import {ProductListParam} from "@/server/types";

interface MarketTitleProps {
    tags: string[],
    query: (query: ProductListParam) => void,
    value: ProductListParam
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MarketTitle = (props: MarketTitleProps) => {
    // const handleMultiSelectChange = debounce((selected: string[]) => {
    //     query({      ...value,      search: selected.join(","),    });
    //     }, 300);
    return (
        <div className="market-title">
            <div className="market-image">
                <img src="/images/marketplace/backgroud.png"/>
            </div>
            <div className="market-filter">
                <div style={{
                    display: "flex",
                    gap: ".5rem"
                }}>
                    <Input placeholder="Search in marketplace"/>
                    <Button style={{
                        backgroundColor: "#ee4b08",
                        color: "#fff"
                    }}>Search</Button>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem"
                }}>
                    <a>Sort</a>
                    <Select
                        defaultValue={'Most popular'}
                        data={['Most popular', 'Recently Updated', 'Most relevant', 'Most expensive', 'Most Cheapest']}
                    />
                </div>
                {/*<div style={{*/}
                {/*    display: "flex",*/}
                {/*    alignItems: "center",*/}
                {/*    gap: ".5rem"*/}
                {/*}}>*/}
                {/*    <a>Type</a>*/}
                {/*    <MultiSelect      */}
                {/*        defaultValue={['All']} */}
                {/*        data={['All', ...tags]} */}
                {/*        onChange={(x) => handleMultiSelectChange(x)}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
        </div>
    )
}