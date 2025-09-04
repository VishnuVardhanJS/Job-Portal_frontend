"use client";

import { useState } from "react";
import {
    Modal,
    TextInput,
    Select,
    NumberInput,
    Button,
    Group,
    Textarea,
    Grid
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export interface JobFormData {
    jobTitle: string;
    companyName: string;
    companyLogoUrl: string;
    location: string;
    jobType: string;
    salaryMin: number;
    salaryMax: number;
    deadline: Date | null;
    jobDescription: string;
    responsibilities: string;
    requirements: string;

}

export default function CreateJobModal() {
    const [opened, setOpened] = useState(false);

    const { control, handleSubmit, reset } = useForm<JobFormData>({
        defaultValues: {
            jobTitle: "",
            companyName: "",
            companyLogoUrl: "",
            location: "",
            jobType: "FullTime",
            salaryMin: 0,
            salaryMax: 0,
            deadline: null,
            jobDescription: "",
            responsibilities: "",
            requirements: "Fresher"
        },
    });

    const onSubmit = async (data: JobFormData) => {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL + "jobs"
        try {
            await axios.post(url, data);
            console.log("Event created!");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Button
                radius="xl"
                size="md"
                variant="gradient"
                gradient={{ from: "violet", to: "indigo" }}
                onClick={() => setOpened(true)}>Create Job</Button>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Create Job Opening"
                centered
                size="80%"
                radius="md"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Controller
                                name="jobTitle"
                                control={control}
                                render={({ field }) => (
                                    <TextInput label="Job Title" placeholder="Full Stack Developer" {...field} required />
                                )}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Controller
                                name="companyName"
                                control={control}
                                render={({ field }) => (
                                    <TextInput label="Company Name" placeholder="Amazon" {...field} required />
                                )}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid mt="md">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        label="Location"
                                        placeholder="Select location"
                                        data={["Chennai", "Bangalore", "Hyderabad", "Remote"]}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Controller
                                name="jobType"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        label="Job Type"
                                        data={["FullTime", "PartTime", "Contract", "Internship"]}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid mt="md">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Controller
                                name="salaryMin"
                                control={control}
                                render={({ field }) => (
                                    <NumberInput
                                        label="Salary Range (Min)"
                                        min={0}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Controller
                                name="salaryMax"
                                control={control}
                                render={({ field }) => (
                                    <NumberInput
                                        label="Salary Range (Max)"
                                        min={0}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid mt="md">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Controller
                                name="deadline"
                                control={control}
                                render={({ field }) => (
                                    <DateInput label="Application Deadline" placeholder="Pick date" {...field} />
                                )}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Controller
                                name="companyLogoUrl"
                                control={control}
                                render={({ field }) => (
                                    <TextInput label="Logo URL" placeholder="https://example.com/logo.png" {...field} />
                                )}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Controller
                                name="responsibilities"
                                control={control}
                                render={({ field }) => (
                                    <TextInput label="Responsibilities" placeholder="" {...field} />
                                )}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Controller
                                name="requirements"
                                control={control}
                                render={({ field }) => (
                                    <TextInput label="Requirements" placeholder="Eg : 0-1 yr Exp" {...field} />
                                )}
                            />
                        </Grid.Col>
                    </Grid>

                    <Controller
                        name="jobDescription"
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                mt="md"
                                label="Job Description"
                                placeholder="Please share a description..."
                                minRows={4}
                                {...field}
                            />
                        )}
                    />

                    <Group mt="xl" justify="space-between">
                        <Button variant="default" onClick={() => setOpened(false)}>
                            Save Draft
                        </Button>
                        <Button type="submit" color="#00AAFF">
                            {`Publish >>`}
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
