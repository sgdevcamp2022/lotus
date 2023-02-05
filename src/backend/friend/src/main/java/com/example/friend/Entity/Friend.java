package com.example.friend.Entity;


import com.example.friend.Util.RequstTimeJsonConverter;
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

    private Timestamp requestTime;

//    @Column(length = 255)
//    @Convert(converter = RequestListJsonConverter.class)
//    @Lob
//    private RequestList requestList;

    @Column(length = 255)
//    @Convert(converter = RequestListJsonConverter.class)
    @Lob
    private String requestList;

    private String friendList;

    private String blackList;


}
