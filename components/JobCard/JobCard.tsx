// components/JobCard.tsx
import { Card, Image, Text, Group, Badge, Button, Stack, Flex } from '@mantine/core';
import { IconUsers, IconBuildingStore, IconCurrencyRupee } from '@tabler/icons-react';

interface JobCardProps {
    companyLogo: string;
    jobTitle: string;
    experience: string;
    type: string;
    salary: string;
    description: string;
    postedAgo: string;
}

export default function JobCard({
    companyLogo,
    jobTitle,
    experience,
    type,
    salary,
    description,
    postedAgo,
}: JobCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 350, minHeight: 200 }}>

            <Group gap="xs" mb="lg" justify="space-between">
                <Group style={{ "boxShadow": "-7px -7px 16px 0 #FFFFFF, 7px 7px 10px -4px rgba(116,150,179,0.27)" }}>
                    <Image src={companyLogo} alt={jobTitle} width={70} height={70} radius="xl" fit='contain' />
                </Group>
                <Group>
                    <Badge color="black" variant="light" size='lg' radius={10} style={{ "backgroundColor": "#B0D9FF" }}>
                        {postedAgo}
                    </Badge>
                </Group>
            </Group>


            <Text size="lg" mb="xs" style={{ "fontWeight": 700 }}>
                {jobTitle}
            </Text>


            <Group gap="xs" mb="sm" style={{ "color": "grey" }}>
                <Group gap={4}>
                    <IconUsers size={16} />
                    <Text size="sm">{experience}</Text>
                </Group>
                <Group gap={4}>
                    <IconBuildingStore size={16} />
                    <Text size="sm">{type}</Text>
                </Group>
                <Group gap={4}>
                    <IconCurrencyRupee size={16} />
                    <Text size="sm">{salary}</Text>
                </Group>
            </Group>

            <Stack gap={4} mb="sm">

                <Text size="sm">
                    {description}
                </Text>

            </Stack>

            <Button fullWidth variant="light" color="white" style={{ "backgroundColor": "#00AAFF" }}>
                Apply Now
            </Button>
        </Card>
    );
}
