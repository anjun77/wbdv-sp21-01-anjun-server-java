package com.example.wbdvsp2101anjunshaoserverjava.models;

public class Widget {

  private Long id;
  private String type;
  private String text;
  private Integer size;
  private String topicId;

  public Widget(Long id, String topicId, String type, Integer size, String text) {
    this.id = id;
    this.type = type;
    this.text = text;
    this.size = size;
    this.topicId = topicId;
  }

  public Widget() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Integer getSize() {
    return size;
  }

  public void setSize(Integer size) {
    this.size = size;
  }

  public String getTopicId() {
    return topicId;
  }

  public void setTopicId(String topicId) {
    this.topicId = topicId;
  }
}