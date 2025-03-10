"use client";
import React, { useState } from "react";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Menu, MenuItem } from "@mui/material";
import { changeTaskStatus } from "@/libs/action";
import { usePathname } from "next/navigation";

export interface Prop {
  task: string;
  taskStatus: string;
}

function DynamicBtn({ task, taskStatus }: Prop) {
  const pathName = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (taskStatus: string) => {
    handleClose();
    changeTaskStatus({
      task: task,
      taskStatus: taskStatus,
      pathName: pathName,
    });
  };
  return (
    <>
      {/*@ts-ignore*/}
      <div onClick={handleClick}>
        {taskStatus == "Completed" ? (
          <CheckCircleIcon className="cursor-pointer" />
        ) : (
          <DataUsageIcon
            className={`cursor-pointer ${
              taskStatus == "Inactive" ? "animate-none" : "animate-spin"
            }`}
          />
        )}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("Inactive")}>
          Inactive
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Operation")}>
          Operation
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Completed")}>
          Completed
        </MenuItem>
      </Menu>
    </>
  );
}
export default DynamicBtn;
