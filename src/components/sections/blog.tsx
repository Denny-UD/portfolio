"use client"

import { motion } from "framer-motion"
import { BookOpen, Clock, Tag } from "lucide-react"
import { blogPosts } from "@/data/mock-data"

export function Blog() {
  return (
    <section id="blog" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <BookOpen className="h-5 w-5 text-green-400" aria-hidden="true" />
        <h2 className="font-mono text-lg font-semibold text-slate-200">
          Blog / Knowledge Base
        </h2>
        <span className="ml-auto rounded-full bg-yellow-950/40 px-2.5 py-0.5 font-mono text-[10px] text-yellow-500">
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
            className="group cursor-pointer rounded-lg border border-slate-800 bg-slate-900/30 p-4 transition-all hover:border-slate-700 hover:bg-slate-900/60"
            tabIndex={0}
            role="article"
            aria-label={post.title}
          >
            <div className="mb-2 flex items-center gap-2 text-[10px] text-slate-600">
              <Clock className="h-3 w-3" aria-hidden="true" />
              <span>{post.readTime}</span>
              <span className="text-slate-800">·</span>
              <span className={post.published ? "text-green-500" : "text-yellow-600"}>
                {post.published ? "Published" : "Draft"}
              </span>
            </div>
            <h3 className="font-mono text-sm font-semibold text-slate-200 group-hover:text-green-400 transition-colors mb-2">
              {post.title}
            </h3>
            <p className="font-mono text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded bg-slate-800 px-2 py-0.5 font-mono text-[9px] text-slate-500"
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