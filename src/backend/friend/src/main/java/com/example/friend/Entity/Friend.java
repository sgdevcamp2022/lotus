package com.example.friend.Entity;

import com.example.friend.Util.RequstTimeJsonConverter;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="`friend`")
public class Friend {

    @Id
    private Long user_id;
    
    @Convert(converter = RequstTimeJsonConverter.class)
    private RequestTime requestTime;

}
