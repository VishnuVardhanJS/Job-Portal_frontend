"use client";

import { Container, Group, Button, rem, Image } from "@mantine/core";
import Link from "next/link";

import CreateJobModal from "../CreateJob/CreateJob";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Find Jobs", href: "/" },
  { label: "Find Talents", href: "/" },
  { label: "About us", href: "/" },
  { label: "Testimonials", href: "/" },
];

export default function Header() {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "white",
        borderRadius: rem(50),
        padding: "0.5rem 1.5rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        marginTop: "1rem",
        maxWidth: "50%",
      }}
    >
      <Group justify="space-between">
        <Image src="/assets/logo.png" alt="Logo" w={40} h={40} />

        <Group gap="xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                textDecoration: "none",
                fontSize: rem(16),
                fontWeight: 500,
                color: "#222",
              }}
            >
              {item.label}
            </Link>
          ))}
        </Group>

        {/* <Button
          radius="xl"
          size="md"
          variant="gradient"
          gradient={{ from: "violet", to: "indigo" }}
        >
          Create Jobs
        </Button> */}

        <CreateJobModal />
      </Group>
    </Container>
  );
}
