import {Button, Input, MultiSelect, Select} from "@mantine/core";
import {ProductListParam} from "@/server/types";

interface MarketTitleProps {
    tags: string[],
    query: (value: (((prevState: ProductListParam) => ProductListParam) | ProductListParam)) => void
}

export const MarketTitle = ({tags, query}: MarketTitleProps) => {
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
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem"
                }}>
                    <a>Type</a>
                    <MultiSelect
                        defaultValue={['All']}
                        data={['All',...tags]}
                        onChange={(value) => {
                            query((prev) => {
                                return {
                                    ...prev,
                                    search: value.join(',')
                                }
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}