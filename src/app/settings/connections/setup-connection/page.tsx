import React, {Suspense} from "react";
import EditConnection from "@/src/components/EditConnection";

export default function EditConnectionPage() {
    return (
        <Suspense>
            <EditConnection></EditConnection>
        </Suspense>
    )
}