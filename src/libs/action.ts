"use server";

import { redirect } from "next/navigation";
import { pool } from "./DB";
import { getServerSession } from "next-auth";
import { Prop } from "@/app/home/todaybook/DynamicBtn";

const Colors = ["#FDF2B3", "#D1EAED", "#FFDADA", "#FFD4A9"];

export async function getUserData() {
  const session = await getServerSession();
  const { rows } = await pool.query(
    `select name,life,profileurl from member where email='${String(
      session?.user?.email
    )}'`
  );

  if (rows[0] == undefined) {
    return { name: session?.user?.name, life: "" };
  }
  return rows[0];
}

export async function getNameEmail() {
  const session = await getServerSession();
  const { rows } = await pool.query(
    `select name,email from member where email='${String(
      session?.user?.email
    )}'`
  );

  if (rows[0] == undefined) {
    return { name: session?.user?.name, email: session?.user?.email };
  }
  return rows[0];
}

export async function handleCreateTask(formData: FormData) {
  const task = formData.get("Task") as string;
  const role = formData.get("Role") as string;
  const session = await getServerSession();
  const { rows } = await pool.query(
    `select id from member where email='${String(session?.user?.email)}'`
  );
  const id = rows[0].id;

  if (task != "") {
    await pool.query(
      `INSERT INTO task (memberid, task, taskstatus, role, timer, isArchived)
       VALUES ($1, $2, 'Inactive', $3, NOW(), $4)`,
      [id, task, role, false]
    );
    return { success: "Creating task is successful." };
  } else {
    return { error: "Fill something for Today task." };
  }
}

export async function handleCreateStickyWall(formData: FormData) {
  const title = formData.get("Tit") as string;
  const notes = formData.get("Nte") as string;

  const session = await getServerSession();
  const { rows } = await pool.query(
    `select id from member where email='${String(session?.user?.email)}'`
  );
  const id = rows[0].id;

  if (title != "" && notes != "") {
    await pool.query(
      `INSERT INTO stickywall (userid, title, notes, color, isArchived)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        id,
        title,
        notes,
        Colors[Math.floor(Math.random() * Colors.length)],
        false,
      ]
    );
    redirect("stickywall");
    return { success: "Creating stickyWall is successful." };
  } else {
    return { error: "Fill something for creating stickyWall." };
  }
}

export async function getTasks() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const { rows } = await pool.query(
    `select id from member where email='${email}'`
  );
  const id = rows[0].id;
  await pool.query(
    `UPDATE task SET isArchived = '${true}' WHERE timer < NOW() - INTERVAL '24 HOURS'`
  );

  const tasks = await pool.query(
    `SELECT * FROM task WHERE memberid = $1 AND isArchived = $2 ORDER BY id DESC`,
    [id, false]
  );

  return tasks.rows;
}
export async function getForTasks() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const { rows } = await pool.query(
    `select id from member where email='${email}'`
  );
  const id = rows[0].id;

  const tasks = await pool.query(
    `SELECT * FROM task WHERE memberid = $1 ORDER BY id DESC`,
    [id]
  );

  return tasks.rows;
}

export async function getStickyWall() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const { rows } = await pool.query(
    `select id from member where email='${email}'`
  );
  const id = rows[0].id;

  const stickyWall = await pool.query(
    `SELECT * FROM stickywall WHERE userid = $1 AND isArchived = $2 ORDER BY id DESC`,
    [id, false]
  );

  return stickyWall.rows;
}
export async function deleteStickyWall(itemId: number) {
  await pool.query(
    `UPDATE stickywall SET isArchived = '${true}' WHERE id = $1`,
    [itemId]
  );

  redirect("stickywall");
}

export async function getPersonalTasks() {
  const allTasks = await getTasks();
  return allTasks.filter((one) => one.role == "Personal");
}

export async function getFreelanceTasks() {
  const allTasks = await getTasks();
  return allTasks.filter((one) => one.role == "Freelance");
}

export async function getWorkTasks() {
  const allTasks = await getTasks();
  return allTasks.filter((one) => one.role == "Work");
}

interface NewProp extends Prop {
  pathName: string;
}

export async function changeTaskStatus({
  task,
  taskStatus,
  pathName,
}: NewProp) {
  await pool.query(
    `update task set taskstatus='${taskStatus}' where task='${task}'`
  );

  if (pathName == "/home/todaybook") {
    redirect("todaybook");
  } else if (pathName == "/home/todaybook/personal") {
    redirect("personal");
  } else if (pathName == "/home/todaybook/freelance") {
    redirect("freelance");
  } else if (pathName == "/home/todaybook/work") {
    redirect("work");
  }
}

export async function updateUserData(formData: FormData) {
  const session = await getServerSession();
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const file = formData.get("imageUrl") as File;

  if (name != "" && role != "") {
    await pool.query(
      `update member set name ='${name}', life = '${role}'
    where email='${session?.user?.email}'`
    );
  }
  if (file != null) {
    await pool.query(
      `update member set profileurl='${file}'
    where email='${session?.user?.email}'`
    );
  }

  redirect("/home");
}
