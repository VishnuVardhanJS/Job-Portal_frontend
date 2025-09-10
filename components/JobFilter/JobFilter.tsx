"use client";

import { Group, TextInput, Select, RangeSlider, Text, rem, Container, Flex, Divider } from "@mantine/core";
import { IconSearch, IconMapPin, IconBriefcase2 } from "@tabler/icons-react";
import { useState } from "react";

export type JobFilterIF = {
    search: string;
    location: string;
    jobType: string;
    salary: [number, number];
};

export default function JobFilter({ filters, setFilters }: { filters: JobFilterIF; setFilters: React.Dispatch<React.SetStateAction<JobFilterIF>>; }) {
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
                <TextInput
                    placeholder="Search By Job Title, Role"
                    leftSection={<IconSearch size={18} />}
                    styles={{
                        input: { border: "none", boxShadow: "none" },
                    }}
                    value={filters.search}
                    onChange={(e) => {
                        const { value } = e.currentTarget;
                        console.log(value)
                        setFilters((prev) => ({ ...prev, search: value || "" }))
                    }
                    }
                />

                <Divider orientation="vertical" />

                <TextInput
                    placeholder="Preferred Location"
                    leftSection={<IconMapPin size={18} />}
                    styles={{
                        input: { border: "none", boxShadow: "none" },
                    }}
                    value={filters.location}
                    onChange={(e) => {
                        const { value } = e.currentTarget;
                        setFilters((prev) => ({ ...prev, location: value || "" }))
                    }
                    }
                />

                <Divider orientation="vertical" />

                <Select
                    placeholder="Job type"
                    data={["Full-Time", "Part-Time", "Internship", "Contract"]}
                    leftSection={<IconBriefcase2 size={18} />}
                    styles={{
                        input: { border: "none", boxShadow: "none" },
                    }}
                    value={filters.jobType}
                    onChange={(value) =>
                        setFilters((prev) => ({ ...prev, jobType: value || "" }))
                    }
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
                        <Text >
                            ₹{filters.salary[0]}LPA - ₹{filters.salary[1]}LPA
                        </Text>
                    </Flex>
                    <RangeSlider
                        min={1}
                        max={99}
                        step={5}
                        value={filters.salary}
                        onChange={(value) =>
                            setFilters((prev) => ({ ...prev, salary: value as [number, number] }))
                        }
                        label={null}
                        color="black"
                    />

                </div>
            </Group>
        </Container>
    );
}
