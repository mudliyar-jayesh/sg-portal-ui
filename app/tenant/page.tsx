"use client";

import React from "react";
// import MapUsersToTenant from "./map-users-tenant";
// import UpdateTenant from "./update-tenant";
// import MapUserToTenant from "./mapping-tenant";
import MapUsersToTenant from "./map-users-tenant";
// import DeleteUserTenantMapping from "./delete-tenant-mapping";
// import CreateTenant from "./create-tenant";
// import TenantList from "./tenant-list";
function page() {
  return (
    <div>
      {/* <CreateTenant></CreateTenant> */}
      {/* <TenantList></TenantList> */}
      {/* <DeleteUserTenantMapping /> */}
      <MapUsersToTenant />
      {/* <MapUsersToTenant /> */}
    </div>
  );
}

export default page;
