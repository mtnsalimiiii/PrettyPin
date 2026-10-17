import {useState} from "react";
import Container from "../../common/Container.jsx";
import FilterTab from "./FilterTab.jsx";
import filterTabs from "../../../data/filterTabs.js";

const FilterBar = () => {
    const [activeTab, setActiveTab] = useState(filterTabs[0].id);

    return (
        <section className="scroll-mt-20 py-4 sm:scroll-mt-24 sm:py-6 md:scroll-mt-28">
            <Container>
                <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:gap-4 sm:overflow-visible">

                    {filterTabs.map((tab) => (
                        <FilterTab
                            key={tab.id}
                            id={tab.id}
                            label={tab.label}
                            isActive={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default FilterBar;