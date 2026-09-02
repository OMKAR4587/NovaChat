import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles } from "lucide-react";

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex w-full justify-end py-3">
        <div className="user-message max-w-[85%] rounded-2xl bg-zinc-900 px-4 py-3 text-[15px] leading-6 text-white shadow-sm sm:max-w-[70%]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-5">
      <div className="flex gap-4">
        {/* AI Avatar */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white">
          <Sparkles size={15} />
        </div>

        {/* AI Message */}
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="mb-3 text-sm font-semibold text-zinc-900">
            NovaChat
          </p>

          <div className="text-[15px] leading-7 text-zinc-700">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-4 mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-3 mt-7 text-xl font-semibold tracking-tight text-zinc-900">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-2 mt-6 text-base font-semibold text-zinc-900">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-4 last:mb-0">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-4 list-disc space-y-1.5 pl-5">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-4 list-decimal space-y-1.5 pl-5">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="pl-1">
                    {children}
                  </li>
                ),

                strong: ({ children }) => (
                  <strong className="font-semibold text-zinc-900">
                    {children}
                  </strong>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-4 border-l-2 border-zinc-300 pl-4 italic text-zinc-600">
                    {children}
                  </blockquote>
                ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    {children}
                  </a>
                ),

                code: ({ className, children, ...props }) => {
                  const isCodeBlock =
                    className?.includes("language-");

                  if (isCodeBlock) {
                    return (
                      <code
                        className={`block min-w-max p-4 font-mono text-[13px] leading-6 text-zinc-100 ${className}`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  return (
                    <code
                      className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },

                pre: ({ children }) => (
                  <pre className="my-5 max-w-full overflow-x-auto rounded-xl bg-zinc-900">
                    {children}
                  </pre>
                ),

                table: ({ children }) => (
                  <div className="my-5 max-w-full overflow-x-auto rounded-xl border border-zinc-200">
                    <table className="w-full border-collapse text-left text-sm">
                      {children}
                    </table>
                  </div>
                ),

                thead: ({ children }) => (
                  <thead className="bg-zinc-50 text-zinc-900">
                    {children}
                  </thead>
                ),

                tr: ({ children }) => (
                  <tr className="border-b border-zinc-200 last:border-0">
                    {children}
                  </tr>
                ),

                th: ({ children }) => (
                  <th className="px-4 py-3 font-semibold">
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className="px-4 py-3 text-zinc-600">
                    {children}
                  </td>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;