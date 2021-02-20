import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:intl/intl.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue, brightness: Brightness.dark),
      home: DatePickerDemo(),
    );
  }
}

class DatePickerDemo extends StatefulWidget {
  @override
  _DatePickerDemoState createState() => _DatePickerDemoState();
}

class _DatePickerDemoState extends State<DatePickerDemo> {
  /// Which holds the selected date
  /// Defaults to today's date.
  static DateTime selectedDate = DateTime.now();

  // static DateFormat dateFormat = new DateFormat("yyyy-MM-dd");
// String formattedDate = dateFormat.format(selectedDate);
  static DateFormat dateFormat = new DateFormat("yyyy-MM-dd");
  String formattedDate = dateFormat.format(selectedDate);
  var unavailableDates = [
    "2021-02-28",
    "2021-02-26",
    "2021-03-01",
    "2021-02-25"
  ];

  List<DateTime> availbleDates = [];

  List<DateTime> getDaysInBeteween(DateTime startDate, DateTime endDate) {
    List<DateTime> days = [];

    for (int i = 0; i <= endDate.difference(startDate).inDays; i++) {
      String partialDate = "";
      partialDate = "" +
          startDate.year.toString() +
          "-" +
          startDate.month.toString() +
          "-" +
          (startDate.day + i).toString();
      var parsedDate = DateFormat("yyyy-MM-dd").parse(partialDate);
      String formattedDate = dateFormat.format(parsedDate);

      if (!unavailableDates.contains(formattedDate)) {
        //print(dateFormat.format(parsedDate));
        // days.add(parsedDate);
        // print(dateFormat.format(parsedDate));
        days.add(DateTime(
            startDate.year,
            startDate.month,
            // In Dart you can set more than. 30 days, DateTime will do the trick
            startDate.day + i));
      }
    }
    return days;
  }

  _selectedDate() {
    List<DateTime> days = getDaysInBeteween(
        new DateTime.now().add(new Duration(days: 3)),
        new DateTime.now().add(new Duration(days: 30)));
    return days.first;
  }

  bool _decideWhichDayToEnable(DateTime val) {
    print(getDaysInBeteween(
        new DateTime.now(), new DateTime.now().add(new Duration(days: 30))));

    String _dates = dateFormat.format(val); //formatting passed in value
    //print((_dates));
    if (!unavailableDates.contains(_dates)) {
      // selectedDate = val;
      if (!availbleDates.contains(val)) {
        //print(val);
        availbleDates.add(val);
      }
      return true;
    } else {
      return false;
    }
    // return !unavailableDates.contains(_dates);
  }

  _selectDate(BuildContext context) async {
    final ThemeData theme = Theme.of(context);
    assert(theme.platform != null);
    switch (theme.platform) {
      case TargetPlatform.android:
      case TargetPlatform.fuchsia:
      case TargetPlatform.linux:
      case TargetPlatform.windows:
        return buildMaterialDatePicker(context);
      case TargetPlatform.iOS:
      case TargetPlatform.macOS:
        return buildCupertinoDatePicker(context);
    }
  }

  /// This builds material date picker in Android

  buildMaterialDatePicker(BuildContext context) async {
    final DateTime picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate(),
      firstDate: _selectedDate(),
      fieldLabelText: 'Booking date',
      fieldHintText: 'Month/Date/Year',
      helpText: 'Select Booking Date',
      cancelText: 'Not Now',
      confirmText: 'Book',
      lastDate: new DateTime.now().add(new Duration(days: 30)),
      selectableDayPredicate: _decideWhichDayToEnable,
      builder: (context, child) {
        return Theme(
          data: ThemeData.light(),
          child: child,
        );
      },
    );
    if (picked != null && picked != selectedDate)
      setState(() {
        selectedDate = picked;
      });
  }

  /// This builds cupertion date picker in iOS
  buildCupertinoDatePicker(BuildContext context) {
    showModalBottomSheet(
        context: context,
        builder: (BuildContext builder) {
          return Container(
            height: MediaQuery.of(context).copyWith().size.height / 3,
            color: Colors.white,
            child: CupertinoDatePicker(
              mode: CupertinoDatePickerMode.date,
              onDateTimeChanged: (picked) {
                if (picked != null && picked != selectedDate)
                  setState(() {
                    selectedDate = picked;
                  });
              },
              initialDateTime: _selectedDate(),
              minimumDate: _selectedDate(),
              maximumDate: new DateTime.now().add(new Duration(days: 30)),
              minimumYear: 2021,
              maximumYear: 2021,
              // selectableDayPredicate: _decideWhichDayToEnable,
            ),
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Text(
              "${selectedDate.toLocal()}".split(' ')[0],
              style: TextStyle(fontSize: 55, fontWeight: FontWeight.bold),
            ),
            SizedBox(
              height: 20.0,
            ),
            RaisedButton(
              onPressed: () => _selectDate(context),
              child: Text(
                'Select date',
                style:
                    TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
              ),
              color: Colors.greenAccent,
            ),
          ],
        ),
      ),
    );
  }
}
