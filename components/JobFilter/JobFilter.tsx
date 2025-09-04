"use client";

import { Group, TextInput, Select, RangeSlider, Text, rem, Container, Flex, Divider } from "@mantine/core";
import { IconSearch, IconMapPin, IconBriefcase2 } from "@tabler/icons-react";
import { useState } from "react";

export default function JobFilter() {
    const [salary, setSalary] = useState<[number, number]>([50, 80]);

    return (
        <Container
            fluid
            style={{
                width: "100%", 
                backgroundColor: "white",
                borderRadius: rem(12),
                boxShadow: "0 4px 6px rgba(0,0,0,0.08)",
                padding: "1rem 2rem",
                marginTop: "1rem",
            }}
        >
            <Group justify="space-between" gap="xl" wrap="nowrap">
                {/* Search Input */}
                <TextInput
                    placeholder="Search By Job Title, Role"
                    leftSection={<IconSearch size={18} />}
                    styles={{
                        input: { border: "none", boxShadow: "none" },
                    }}
                />

                <Divider orientation="vertical" />

                <TextInput
                    placeholder="Preferred Location"
                    leftSection={<IconMapPin size={18} />}
                    styles={{
                        input: { border: "none", boxShadow: "none" },
                    }}
                />

                <Divider orientation="vertical" />

                <Select
                    placeholder="Job type"
                    data={["Full-time", "Part-time", "Internship", "Contract"]}
                    leftSection={<IconBriefcase2 size={18} />}
                    styles={{
                        input: { border: "none", boxShadow: "none" },
                    }}
                />

                <Divider orientation="vertical" />

                <div style={{ width: "20%" }}>
                    <Flex
                        mih={50}
                        gap="xl"
                        justify="space-between"
                        align="center"
                        direction="row"
                        wrap="wrap"
                    >
                        <Text >
                            Salary Per Month
                        </Text>
                        <Text  >
                            ₹{salary[0]}k - ₹{salary[1]}k
                        </Text>
                    </Flex>
                    <RangeSlider
                        min={50}
                        max={100}
                        step={5}
                        value={salary}
                        onChange={setSalary}
                        label={null}
                        color="black"
                    />

                </div>
            </Group>
        </Container>
    );
}
