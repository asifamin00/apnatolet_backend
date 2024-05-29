const prop_approv_pipeline = [
        {
          $match: {
            atlprop_id: idm
          }
        },
        {
          $lookup: {
            from: 'usersches',           // The collection to join
            localField: 'user_id',   // Field from the orders collection
            foreignField: '_id',         // Field from the customers collection
            as: 'propt_info'          // Alias for the joined data
          }

        },



        {
          $addFields: {
            users: { $first: "$propt_info" },
          }
        },


        {
          $project: {
            "atlprop_id": 1,
            "image": 1,
            "prop_kind": 1,
            "Bedrooms": 1,
            "prop_type": 1,
            "rent": 1,
            "users.Phone": 1,
            "users.userFname": 1,
            "users.userLname": 1,
            "users.role": 1,
            "approved_by": 1,
            "status": 1,
            "live": 1,
            "Bathrooms": 1,
            "Balconies": 1,
            "Furnishing": 1,
            "Coveredparking": 1,
            "openparking": 1,
            "Facing": 1,
            "House_no": 1,
            "Society": 1,
            "Locality": 1,
            "Pin_code": 1,
            "City": 1,
            "Latitude": 1,
            "Longitude": 1,
            "Total_floor": 1,
            "Property_on_floor": 1,
            "ageBulding": 1,
            "Available": 1,
            "furnicheckbox": 1,
            "otherRoom": 1,
            "Willing": 1,
            "amenities": 1,
            "add_info": 1,
            "created": 1,
            "Bult_up_Area":1


          }
        }


      ]
      const prop_approv = await propModel.aggregate(prop_approv_pipeline)