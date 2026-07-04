"use client"

import { motion } from "framer-motion"
import { BookOpen, Clock, Tag } from "lucide-react"
import { blogPosts } from "@/data/mock-data"

export function Blog() {
  return (
    <section id="blog" className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
        <BookOpen className="h-5 w-5" style={{ color: "var(--accent)" }} aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          Blog / Knowledge Base
        </h2>
        <span
          className="ml-auto rounded-full px-2.5 py-0.5 font-mono text-[10px]"
          style={{
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            color: "#f59e0b",
          }}
        >
          Coming Soon
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-lg border p-4 transition-all"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)" }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)" }}
            tabIndex={0}
            role="article"
            aria-label={post.title}
          >
            <div className="mb-2 flex items-center gap-2 text-[10px]" style={{ color: "var(--text-muted)" }}>
              <Clock className="h-3 w-3" aria-hidden="true" />
              <span>{post.readTime}</span>
              <span style={{ color: "var(--border-color)" }}>·</span>
              <span style={{ color: post.published ? "var(--accent-light)" : "#f59e0b" }}>
                {post.published ? "Published" : "Draft"}
              </span>
            </div>
            <h3
              className="font-mono text-sm font-semibold mb-2 transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {post.title}
            </h3>
            <p className="font-mono text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: "var(--text-muted)" }}>
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[9px]"
                  style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-muted)" }}
                >
                  <Tag className="h-2.5 w-2.5" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}