"use client"
import "./page.css"
import Header from "@/components/Header/Header";
import { Container, Space, SimpleGrid } from "@mantine/core";
import JobFilter from "@/components/JobFilter/JobFilter";
import JobCard from "@/components/JobCard/JobCard";
import { useEffect, useState } from "react";

import axios from "axios";

export interface JobData {
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
  createdAt: string;
  id: number;
}

export default function Home() {
  const [jobs, setJobs] = useState<JobData[] | null>(null)

  function timeAgo(dateString: string) {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const unit in intervals) {
      const interval = Math.floor(seconds / intervals[unit]);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }

    return 'Just now';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL + "jobs"
        const response = await axios.get<JobData[]>(url);
        console.log(response.data)
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid>
      <Header />

      <Space h="md" />

      <JobFilter />

      <Space h="md" />

      <SimpleGrid cols={4}>
        {jobs !== null && jobs.map((job) => (
          <JobCard
            key={job.id}
            companyLogo={job.companyLogoUrl}
            jobTitle={job.companyName}
            experience={job.requirements}
            type={job.jobType}
            description={job.jobDescription}
            postedAgo={timeAgo(job.createdAt)}
            salary={`${job.salaryMin}-${job.salaryMax} LPA`}
          />
        ))}
      </SimpleGrid>

    </Container>
  );
}
