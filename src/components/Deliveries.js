import React from "react";
import DeliveryElement from "./DeliveryElement";

function Deliveries() {
  return (
    <div>
      <DeliveryElement
        item_name="Passport"
        source="1333 S Park St"
        destination="robie st"
        delivery_status="In transit"
      />
      <DeliveryElement
        item_name="Aadhar Card"
        source="1333 S Park St"
        destination="robie st"
        delivery_status="In transit"
      />
      <DeliveryElement
        item_name="Permit"
        source="1333 S Park St"
        destination="robie st"
        delivery_status="In transit"
      />
    </div>
  );
}

export default Deliveries;
