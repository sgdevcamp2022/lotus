package com.example.auth.Entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.simple.JSONArray;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "`friend`")
public class Friend {

    @Id
    @Column(name = "user_id")
    private Long userId;

    //private Timestamp requestTime;
    @Lob
    private String requestTime;

//    @Column(length = 255)
//    @Convert(converter = RequestListJsonConverter.class)
//    @Lob
//    private RequestList requestList;

    @Lob
    private String requestList;

    @Lob
    private String friendList;

    @Lob
    private String blackList;


}
