"use client";

import { useEffect, useState } from "react";

type Task = { id: string; title: string; done: boolean };
const initial: Task[] = [
  { id: "1", title: "Create my first Next.js app", done: true },
  { id: "2", title: "Push the project to GitHub", done: false },
  { id: "3", title: "Deploy the app on Vercel", done: false },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [title, setTitle] = useState("");
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("taskflow-tasks");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(t => t && typeof t.id === "string" && typeof t.title === "string" && typeof t.done === "boolean")) setTasks(parsed);
      }
    } catch { setNotice("Browser storage is unavailable. Changes will last for this session."); }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem("taskflow-tasks", JSON.stringify(tasks)); }
    catch { setNotice("Your browser could not save changes. Keep this tab open to retain them."); }
  }, [tasks, ready]);

  const completed = tasks.filter(t => t.done).length;
  const visible = tasks.filter(t => filter === "All" || (filter === "Completed" ? t.done : !t.done));

  return (
    <main>
      <header><a className="brand" href="/">◈ Taskflow</a><span className="badge">YOUR DAILY SPACE</span></header>
      <section className="intro"><span className="eyebrow">A LITTLE FOCUS GOES A LONG WAY</span><h1>Make room for<br /><em>what matters.</em></h1><p>One task at a time. A simple space to plan your day<br className="desktop" /> and celebrate the small wins.</p></section>
      <section className="workspace" aria-label="Task manager">
        <div className="section-heading"><div><h2>My tasks <span>{tasks.length}</span></h2><p>Your next step starts here.</p></div><div className="progress">{completed}<span> / {tasks.length} done</span></div></div>
        <div className="track" role="progressbar" aria-label="Completed tasks" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={tasks.length || 1}><div style={{ width: `${tasks.length ? completed / tasks.length * 100 : 0}%` }} /></div>
        <form onSubmit={e => { e.preventDefault(); if (!ready || !title.trim()) return; setTasks([...tasks, { id: crypto.randomUUID(), title: title.trim(), done: false }]); setTitle(""); }}>
          <label className="sr-only" htmlFor="task">New task</label><input id="task" placeholder="What would you like to get done?" value={title} onChange={e => setTitle(e.target.value)} maxLength={180} required disabled={!ready} /><button className="add" disabled={!ready || !title.trim()}>+ <span>Add task</span></button>
        </form>
        <div className="filters" aria-label="Filter tasks">{(["All", "Active", "Completed"] as const).map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)} className={filter === f ? "selected" : ""}>{f}</button>)}</div>
        <ul>{visible.map(task => <li key={task.id} className={task.done ? "done" : ""}><label><input type="checkbox" checked={task.done} disabled={!ready} onChange={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t))} /><span>{task.title}</span></label><button className="delete" aria-label={`Delete ${task.title}`} disabled={!ready} onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>×</button></li>)}</ul>
        {visible.length === 0 && <div className="empty">{filter === "Completed" ? "Your small wins will appear here." : "A clear list. A fresh start. Add a task above."}</div>}
        <div className="list-footer"><span>{tasks.length - completed} tasks remaining</span><button disabled={!completed || !ready} onClick={() => setTasks(tasks.filter(t => !t.done))}>Clear completed</button></div>
        {notice && <p role="status" className="notice">{notice}</p>}
      </section>
      <footer>Built with Next.js <span>•</span> Saved in this browser <span>•</span> Made for a little more focus</footer>
    </main>
  );
}
