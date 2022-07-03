import { Box, Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ExpanseCategory from "../Components/ExpanseCategory";

import { ExpanseHeader } from "../Components/ExpanseHeader";
import { ExpanseMain } from "../Components/ExpanseMain";
import { TabPanel, a11yProps } from "../Components/TabPanel";
import { UserMenu } from "../Components/UserMenu";
import { useExpansePageState } from "../Hooks/ExpansePageState";

export default function ExpansePage() {
  const { month } = useParams<{ month: string }>();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const { expanses, getSumExpanses, expansesCategory, handleSelectedDate } =
    useExpansePageState(month!);

  return (
    <Container>
      <Box textAlign="right" paddingTop="20px">
        <UserMenu />
      </Box>
      <h1 style={{ margin: 0 }}>Despesas</h1>
      <Box component="div">
        <ExpanseHeader
          firstDate={month!}
          onChangeCompleteDate={handleSelectedDate}
          somaDespesas={getSumExpanses}
        />

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTabs}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
            centered
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={selectedTab} index={0}>
          <ExpanseMain expanses={expanses} />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <ExpanseCategory expanses={expansesCategory} />
        </TabPanel>
      </Box>
    </Container>
  );
}
