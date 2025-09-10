"use client"
import "./page.css"
import Header from "@/components/Header/Header";
import { Container, Space, SimpleGrid } from "@mantine/core";
import JobFilter from "@/components/JobFilter/JobFilter";
import JobCard from "@/components/JobCard/JobCard";
import { useEffect, useState, useMemo } from "react";
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
  const [filterJobs, setFilterJobs] = useState<JobData[] | null>(null)

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    jobType: "",
    salary: [1, 99] as [number, number],
  });

  const filteredJobs = useMemo(() => {
    if (jobs === null) {
      return null
    }
    return jobs.filter((job) => {
      const matchesSearch = filters.search ? job.companyName.toLowerCase().includes(filters.search.toLowerCase()) : true;

      const matchesLocation = filters.location
        ? job.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;

      const matchesJobType = filters.jobType
        ? job.jobType === filters.jobType
        : true;

      const matchesSalary = job.salaryMin >= filters.salary[0] && job.salaryMax <= filters.salary[1]

      return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
    });
  }, [filters, jobs]);


  useMemo(() => {
    setFilterJobs(filteredJobs);
  }, [filteredJobs]);

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

      <JobFilter filters={filters} setFilters={setFilters} />

      <Space h="md" />

      <SimpleGrid cols={4}>
        {filterJobs !== null && filterJobs.map((job) => (
          <JobCard
            key={job.id + 10}
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
