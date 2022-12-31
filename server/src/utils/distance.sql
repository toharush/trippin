SELECT * from (SELECT id, "position", ( 6371 * 
    ACOS( 
        COS( RADIANS( "position"[0] ) ) * 
        COS( RADIANS( -71.060316 ) ) * 
        COS( RADIANS( 50 ) - 
        RADIANS( "position"[1]  ) ) + 
        SIN( RADIANS( "position"[0] ) ) * 
        SIN( RADIANS( -71.060316) ) 
    ) 
) "distance" FROM trippin.place) "place" WHERE "place"."distance" <= 100 ORDER BY "distance" ASC;

SELECT * from (SELECT id, "position",
( 6371 * 
    ACOS( 
        COS( RADIANS( db_latitude ) ) * 
        COS( RADIANS( $user_latitude ) ) * 
        COS( RADIANS( $user_longitude ) - 
        RADIANS( db_longitude ) ) + 
        SIN( RADIANS( db_latitude ) ) * 
        SIN( RADIANS( $user_latitude) ) 
    ) 
) "distance" FROM original_Table) the_table WHERE the_table."distance" <= the_radius ORDER BY "distance" ASC;